const fs = require("fs").promises;
const randomstring = require("randomstring");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dirty = require("dirty");
const port = 5000;
app.use(cors());
app.use(bodyParser.json({ limit: "8mb" }));

let data = [
  "नेपालको ठुला ठुला मान्छेले देखेको कुराले सबैलाइ अचम्ममा पार्नसक्छ ।",
  "पृथ्वीको तेस्रो ध्रुवको रुपमा चिनिने हिमालय क्षेत्रको जैविक विविधताले भरिपूर्ण छ ।",
  "यहाँ विभिन्न प्रजातिका वन्यजन्तु र वनस्पति छन् ।",
  "यो नेपाली शीर उचाली संसारमा लम्किन्छ",
  "जुनकिरी झैं ज्योति बाली अन्धकारमा चम्किन्छ",
  "चाहे झुकोस निलो आकास यो नेपाली झुक्दैन",
  "चाहे रुकोस् चिसो बतास यो नेपाली रुक्दैन",
  "एकातिर तराईको चारकोसे झाडी छ",
  "अर्कोतिर उच्च शीर ठुल्ठुला पहाडी छ",
  "जन्मे यहीं गौतम बुद्ध शान्तिका अग्रदूत",
  "सगरमाथा बिजय गर्ने यही देशका हुन सपूत",
  "मृगले आफ्ना पाठाहरूलाई शिक्षा दिँदै थिई ।",
  "शिक्षाको मूल विषय हिंसक र अहिंसक जीव कसरी छुटयाउने भन्ने थियो ।",
  "अन्त्यमा मृगले पाठाहरूलाई सोध्न थालीः",
  "मृगः बाघ के हो ?",
  "पाठाः बाघ हिंसक जीव हो किनकि उसको दाह्रा र नंग्रा हुन्छ ।",
  "मृगः ठिक भन्यौ ।",
  "हामीहरू बाघसँग जोगिनु पर्छ । ",
  "व्वांसो के हो भन त ।",
  "पाठाः त्यो पनि हिंसक जीव हो ।",
  "त्यसको पनि तीखा दाँत र नंग्रा हुन्छन् ।",
  "मृगः ठिक ।",
  "अब भन जरायो के हो ?",
  "पाठाः त्यो त हामी जस्तै अहिंसक जीव हो ।",
  "उसका दाह्रा नंग्रा केही पनि हुँदैन ।",
  "मृगः एकदम ठिक भन्यौ ।",
  "तिमीहरूले हिंसक जीव र अहिंसक जीव छुट्याउन सक्ने भएछौ ।",
  "अब तिमीहरू बनमा घुम्न जान सक्छौ ।",
  "तर एक्लाएक्लै नहिँडनु नि । ",
  "यत्तिकैमा एउटा सानो पाठोले सोध्यो । आमा, हाम्रो जस्तै चार वटा खुट्टा भएर पनि पछिल्ला दुइटा खुट्टाले मात्रै टेकेर हिंडने । बाँदर जस्ता जीव के हो नि ?",
  "मृगः ए त्यो त मानिस हो ।",
  "सबै पठाहरूले एकै स्वरमा सोधेः त्यो हिँसक हो कि अहिँसक हो नि ?",
  "मृगः त्यसलाई चिन्न गाह्रो छ ।",
  "त्यसले के गर्छ भनेर यस्सै भन्न सकिँदैन ।",
  "कोही हिँसक हुन्छन् भने कोही अहिंसक पनि हुन्छन् ।",
  "त्यसको न त मुख, दाँत र हात खुट्टा हेरेर अडकल गर्न सकिन्छ न त स्वर सुनेरै । हिंसक जीवहरूबाट त हामी परैबाट होसियार हुन्छौं ।",
  "तर मानिसको चाल थाहा पाउन गाह्रो हुन्छ ।",
  "उसले माया पनि गर्छ । मिठो खान पनि दिन्छ ।",
  "मिठो बोली पनि बोल्छ तर उसले कहाँ जाल वा पासो थापेको हुन्छ ।",
  "र कुन बेला कहाँ कसरी झुक्याउँछ भन्नै सकिँदैन ।",
  "त्यसैले मानिसबाट सँधै टाढै बस्नु है ।",
  "म्यानमारको सेनाले आफ्नो विरोध गर्नेलाई २० वर्षसम्मको जेल हुन सक्ने चेतावनी दिएको छ ।",
  "म्यानमार सेनाले सत्ता हत्याउने नेताहरुविरुद्ध घृणा फैलाउने र अपमान गर्नेलाई लामो जेल सजाय र जरिवाना लगाइने घोषणा गरेको छ ।",
  "त्यही सम्झौताअनुरुप पहिलो खेपको खोप आइतबार ल्याउन लागिएको हो ।",
];

let db = dirty("dbs/one.db");

app.get("/sentence", async (req, res) => {
  console.log("Sentence requested");
  let corpus = db.get("corpus");
  let i = Math.floor(Math.random() * corpus.length);
  res.json({ index: i, text: corpus[i] });
});

app.post("/correct", (req, res) => {
  let index = req.body.index; //recording index
  db.update("recordings", (r) => {
    if (r[index].correct === undefined) r[index].correct = 1;
    else r[index].correct += 1;
    return r;
  });
  res.sendStatus(200);
});
app.post("/incorrect", (req, res) => {
  let index = req.body.index; //recording index
  db.update("recordings", (r) => {
    if (r[index].incorrect === undefined) r[index].incorrect = 1;
    else r[index].incorrect += 1;
    return r;
  });
  res.sendStatus(200);
});
app.get("/randomSample", (req, res) => {
  let recordings = db.get("recordings");
  let corpus = db.get("corpus");
  let i = Math.floor(Math.random() * recordings.length);
  res.json({
    text: corpus[recordings[i].index],
    audio: recordings[i].directory,
    correct: recordings[i].correct,
    incorrect: recordings[i].incorrect,
  });
});

app.get("/recording", (req, res) => {
  let recordings = db.get("recordings");
  let corpus = db.get("corpus");
  let i = Math.floor(Math.random() * recordings.length);
  res.json({
    recording_index: i,
    text_index: recordings[i].index,
    text: corpus[recordings[i].index],
    audio: recordings[i].directory,
  });
});

app.post("/record", async (req, res) => {
  let folderName = "uploads1/" + randomstring.generate();
  console.log("# Making random directory", folderName);
  await fs.mkdir(folderName);
  var buf = Buffer.from(req.body.audio, "base64"); // decode
  await fs.writeFile(folderName + "/" + "voice.mp3", buf);
  db.update(req.body.index, (preData) => {
    if (Array.isArray(preData)) {
      return [...preData, folderName];
    }
    return [folderName];
  });
  db.update("recordings", (d) => {
    if (Array.isArray(d)) {
      return [...d, { index: req.body.index, directory: folderName }];
    }
    return [{ index: req.body.index, directory: folderName }];
  });
  res.sendStatus(200);
});

const util = require('util');
const exec = util.promisify(require('child_process').exec);

app.post("/listen", async (req, res) => {
  let folderName = "uploads2/" + randomstring.generate();
  console.log("# Making random directory", folderName);
  await fs.mkdir(folderName);
  var buf = Buffer.from(req.body.audio, "base64"); // decode
  await fs.writeFile(folderName + "/" + "voice.mp3", buf);
  let audioIn = folderName + "/" + "voice.mp3"
  let audioOut = folderName + "/" + "voice.wav"
  let command = `sox ${audioIn} ${audioOut} rate 16000 remix 1`
  await exec(command);
  command = `python3 ../4ai/Main.py /home/azureuser/dhwoni-crowsourcing/${folderName}/voice.wav`;
  const { stdout, stderr } = await exec(command);
  console.log(stdout);
  res.json({ text: stdout });
});

app.use("/uploads1", express.static("uploads1"));
express.static.mime.types['wasm'] = 'application/wasm';
app.use("/", express.static("frontend/build"));

db.on("load", () => {
  if (db.get("corpus") === undefined) {
    db.set("corpus", data);
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
db.on("drain", () => {
  console.log("drained");
});
