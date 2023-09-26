const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const KutuphaneModel = require("./kutuphane.schema");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/my-db");

  //KİTAPLARI GETİR:
  app.get("/books", async (req, res) => {
    const books = await KutuphaneModel.find();
    res.send(books);
  });

  // İD'Sİ VERİLEN KİTABI GETİR:
  app.get("/books/:id", async (req, res) => {
    const id = req.params.id;
    const books = await KutuphaneModel.findById(id);
    res.send(books);
  });

  // KİTAP OLUŞTURMA
  app.post("/books", async (req, res) => {
    const body = req.body;
    body.createdAt = new Date();
    await KutuphaneModel.create(body);
    res.send(body);
  });

  // KİTAP GÜNCELLEME:
  app.put("/books/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.updatedAt = new Date();
    await KutuphaneModel.findOneAndUpdate({ _id: id }, body);
    res.send(body);
  });

  // KİTAP SİLME:
  app.delete("/books/:id", async (req, res) => {
    const id = req.params.id;
    await KutuphaneModel.deleteOne({ _id: id });
    res.send("KAYIT SİLİNDİ");
  });
  // ÖĞRENCİYİ TC KİMLİK NUMARASINA GÖRE GETİR:
  app.get("/books/tc/:tcId", async (req, res) => {
    const tcId = parseInt(req.params.tcId, 10);
    const student = await KutuphaneModel.findOne({ tcId: tcId });
    res.send(student);
  });

  // SADECE AKTİF KULLANICILARI GETİR:
  app.get("/books/active/all", async (req, res) => {
    const users = await KutuphaneModel.find({ isActive: true });
    res.send(users);
  });

  // SADECE PASİF KULLANICILARI GETİR:
  app.get("/books/deActive/all", async (req, res) => {
    const users = await KutuphaneModel.find({ isActive: false });
    res.send(users);
  });

  // VERİLEN İSME GÖRE KULLANICIYI ÇEKME:
  app.get("/books/names/:name", async (req, res) => {
    const name = req.params.name;
    const users = await KutuphaneModel.find({ name });
    res.send(users);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
  });
}
