DROP TABLE IF EXISTS objetivo;
DROP TABLE IF EXISTS resultado;

CREATE TABLE IF NOT EXISTS objetivo(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,tiempo TEXT,img TEXT);
INSERT or IGNORE INTO objetivo VALUES (1, 'potencia','', 'https://i.pinimg.com/originals/77/0a/ac/770aacd5eb6924b20e924e4a649d2019.jpg');
INSERT or IGNORE INTO objetivo VALUES (2, 'Fuerza', '', 'https://i.ytimg.com/vi/qAwesDx7MwM/sddefault.jpg');
INSERT or IGNORE INTO objetivo VALUES (3, 'Perdida de grasa', '', 'https://i.pinimg.com/originals/d1/a4/6c/d1a46c2a7753864077f386566b5fc9ba.jpg');
 
CREATE TABLE IF NOT EXISTS resultado(id INTEGER PRIMARY KEY AUTOINCREMENT,nombreresultado TEXT, objetivoId INTEGER);
INSERT or IGNORE INTO resultado(id, nombreresultado, objetivoId) VALUES (1, 'Bajar grasita jaja', 1);
INSERT or IGNORE INTO resultado(id, nombreresultado, objetivoId) VALUES (2, 'Aumentar fuerza', 1);
INSERT or IGNORE INTO resultado(id, nombreresultado, objetivoId) VALUES (3, 'Definicion muscular', 2);
