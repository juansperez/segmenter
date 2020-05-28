import fs from "fs";
import db from "../../data/db.json";

export class SaveTest {
  private test: any = {
    id: null,
    init_process: null,
    name: null,
    arguments_process: null,
    init_save: null,
    end_save: null,
    error_segmenter: null,
    error_saving: null,
    size: null,
  };

  constructor(test: any) {
    this.test = test;
  }

  async add() {
    let saved = false;
    let id = 0;
    if (db.length > 0) {
      const lastTest = db[db.length - 1];
      id = lastTest.id;
    }
    this.test.id = id + 1;
    db.push(this.test);
    fs.writeFileSync("./data/db.json", JSON.stringify(db));
    saved = true;

    return saved;
  }
}
