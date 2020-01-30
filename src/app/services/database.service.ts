import { Injectable } from "@angular/core";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { BehaviorSubject, Observable } from "rxjs";
import { Platform } from "@ionic/angular";

export interface ObjetivoInt {

  id: number;
  nombre: string;
  tiempo: string;
  img: string;
}

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  objetivos = new BehaviorSubject([]);
  planes = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: "objetivos.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http
      .get("assets/seed.sql", { responseType: "text" })
      .subscribe(sql => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadObjetivos();
            this.loadPlanes();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getObjetivos(): Observable<ObjetivoInt[]> {
    return this.objetivos.asObservable();
  }

  getPlanes(): Observable<any[]> {
    return this.planes.asObservable();
  }

  loadObjetivos() {
    return this.database.executeSql("SELECT * FROM objetivo", []).then(data => {
      let objetivos: ObjetivoInt[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          objetivos.push({
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            tiempo: data.rows.item(i).tiempo,
            img: data.rows.item(i).img
          });
        }
      }
      this.objetivos.next(objetivos);
    });
  }

  loadPlanes() {
    let query =
      "SELECT gim.nombreplan, gim.id, objetivo.nombre AS objetivo_nombre FROM gim JOIN objetivo ON objetivo.id = gim.objetivoId";
    return this.database.executeSql(query, []).then(data => {
      let planning = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          planning.push({
            id: data.rows.item(i).id,
            nombreplan: data.rows.item(i).nombreplan,
            objetivo_nombre: data.rows.item(i).objetivo_nombre
          });
        }
      }
      this.planes.next(planning);
    });
  }

  addObjetivo(nombre, tiempo, img) {
    let data = [nombre, tiempo, img];
    return this.database
      .executeSql(
        "INSERT INTO objetivo (nombre, tiempo, img) VALUES (?, ?, ?)",
        data
      )
      .then(data => {
        this.loadObjetivos();
      });
  }

  getObjetivo(id): Promise<ObjetivoInt> {
    return this.database
      .executeSql("SELECT * FROM objetivo WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          nombre: data.rows.item(0).nombre,
          tiempo: data.rows.item(0).tiempo,
          img: data.rows.item(0).img
        };
      });
  }

  deleteObjetivo(id) {
    return this.database
      .executeSql("DELETE FROM objetivo WHERE id = ?", [id])
      .then(_ => {
        this.loadObjetivos();
        this.loadPlanes();
      });
  }

  updateObjetivo(objetivox: any) {
    let data = [objetivox.nombre, objetivox.genero, objetivox.img];
    return this.database
      .executeSql(
        `UPDATE objetivo SET nombre = ?, tiempo = ?, img = ? WHERE id = ${objetivox.id}`,
        data
      )
      .then(data => {
        this.loadObjetivos();
      });
  }

  addPlan(nombreplany, objetivoy) {
    let data = [nombreplany, objetivoy];
    console.log(nombreplany, "   ", objetivoy);
    return this.database
      .executeSql("INSERT INTO gim (nombreplan, objetivoId) VALUES (?, ?)", data)
      .then(data => {
        this.loadPlanes();
      });
  }

  getPlan(id): Promise<any> {
    return this.database
      .executeSql("SELECT * FROM gim WHERE id = ?", [id])
      .then(data => {
        return {
          id: data.rows.item(0).id,
          tiempo: data.rows.item(0).tiempo,
          objetivoId: data.rows.item(0).objetivoId
        };
      });
  }

  deletePlan(id) {
    return this.database
      .executeSql("DELETE FROM gim WHERE id = ?", [id])
      .then(_ => {
        this.loadObjetivos();
        this.loadPlanes();
      });
  }

  updatePlan(plan: any) {
    let data = [plan.nombreplan, plan.objetivoId];
    return this.database
      .executeSql(
        `UPDATE gim SET nombreplan = ?, objetivoId = ? WHERE id = ${plan.id}`,
        data
      )
      .then(data => {
        this.loadPlanes();
      });
  }
}
