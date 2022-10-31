// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyB9ZJ19xZ7NITN85x2IYtVlYvPMbYRMwbs",
  authDomain: "screm-fbc61.firebaseapp.com",
  projectId: "screm-fbc61",
  storageBucket: "screm-fbc61.appspot.com",
  messagingSenderId: "165996595659",
  appId: "1:165996595659:web:537a91f6d141b64784ce4e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (!fields.collection || !files) {
      return res.status(400).json({ data: 'Data not found' });
    }

    uploadFiles({
      collection: fields.collection as string,
      files: files
    });

    return res.status(201).json({ data: `Collection: ${fields.collection} - Files: ${Object.keys(files).length}` });
  });
}

interface IFile {
  collection: string;
  files: formidable.Files;
}

const uploadFiles = async (file: IFile) => {
  for (let i = 0; i < Object.keys(file.files).length; i++) {
    const f = file.files[Object.keys(file.files)[i]];
    // Get file from formidable file
    // @ts-ignore
    const rawData = fs.readFileSync(f.filepath);

    // Upload to Firebase Storage
    // @ts-ignore
    const storageRef = ref(storage, `${f.originalFilename}`);
    const metadata = {
      // @ts-ignore
      contentType: f.mimetype,
    };

    await uploadBytesResumable(storageRef, rawData, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        console.log('Uploaded a blob or file!');
        console.log(downloadURL);

        // Upload to Firebase Firestore
        try {
          const docRef = await addDoc(collection(db, file.collection), {
            // @ts-ignore
            filename: `${f.originalFilename}`,
            uri: downloadURL,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }
};
