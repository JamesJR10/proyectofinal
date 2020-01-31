import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { ObjetivoInt } from "src/app/services/database.service";
import { DatabaseService } from "./../../services/database.service";

import { AlertController } from "@ionic/angular";


@Component({
  selector: "app-planes-entrenamiento",
  templateUrl: "./planes-entrenamiento.page.html",
  styleUrls: ["./planes-entrenamiento.page.scss"]
})
export class PlanesEntrenamientoPage implements OnInit {
  objetivos: ObjetivoInt[] = [];

  planes: Observable<any[]>;

  objetivo = {};
  plan = {};

  selectedView = "objetivs";

  constructor(
    private db: DatabaseService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getObjetivos().subscribe(objetivs => {
          console.log("iniciando la bd ", objetivs);
          this.objetivos = objetivs;
        });
        this.planes = this.db.getPlanes();
      }
    });
  }

  addObjetivoP() {
    this.db
    .addObjetivo(this.objetivo["nombre"], this.objetivo["tiempo"], this.objetivo["img"])
      .then(_ => {
        this.objetivo = {};
      });
  }

  addPlanP() {
    this.db.addPlan(this.plan["nombreresultado"], this.plan["objetivoId"]).then(_ => {
      this.plan = {};
    });
  }

  deleteObjetivoP(id) {
    this.db.deleteObjetivo(id).then(_ => {
      console.log("Eliminado Objetivo");
    });
  }

  deletePlanP(id) {
    this.db.deletePlan(id).then(_ => {
      console.log("Eliminado Plan");
    });
  }

  editObjetivoP(id) {
    this.db.getObjetivo(id).then(objetivo => {
      this.presentAlertObjetivo(objetivo);
    });
  }

  editPlanP(id) {
    this.db.getPlan(id).then(plan => {
      this.presentAlertPlan(plan);
    });
  }

  async presentAlertObjetivo(objetivo) {
    const alert = await this.alertController.create({
      header: "Modificar Objetivo",
      inputs: [
        {
          label: "Nombre:",
          value: objetivo.nombre,
          name: "objetivoNombre",
          type: "text",
          placeholder: "Nombre de Objetivo"
        },
        {
          label: "Tiempo:",
          value: objetivo.tiempo,
          name: "objetivoTiempo",
          type: "text",
          placeholder: "Tiempo de plan de Objetivo"
        },
        {
          label: "Foto:",
          value: objetivo.img,
          name: "objetivoImg",
          type: "text",
          placeholder: "Foto de Objetivo"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Modificar",
          cssClass: "warning",
          handler: e => {
            this.db
              .updateObjetivo({
                id: objetivo.id,
                nombre: e.objetivoNombre,
                tiempo: e.objetivoTiempo,
                img: e.objetivoImg
              })
              .then(_ => {
                console.log("Objetivo modificado");
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPlan(plan) {
    const alert = await this.alertController.create({
      header: "Modificar Plan (Solo nombreresultado)",
      inputs: [
        {
          label: "Nombre:",
          value: plan.nombreresultado,
          name: "PlanNombreresultado",
          type: "text",
          placeholder: "Nombreresultado Plan"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Modificar",
          cssClass: "warning",
          handler: e => {
            this.db
              .updatePlan({
                id: plan.id,
                Nombreplan: e.PlanNombreresultado,
                objetivoId: plan.objetivoId
              })
              .then(_ => {
                console.log("Plan modificado");
              });
          }
        }
      ]
    });

    await alert.present();
  }
}

