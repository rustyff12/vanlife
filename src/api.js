import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	doc,
	getDocs,
	getDoc,
	query,
	where,
} from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyBSHVgVQzPK4Xi6hbxI3jzEpdDaoDzXODA",
	authDomain: "vanlife-2b927.firebaseapp.com",
	projectId: "vanlife-2b927",
	storageBucket: "vanlife-2b927.firebasestorage.app",
	messagingSenderId: "45265134352",
	appId: "1:45265134352:web:e0c298305f367a6a977b95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
	const querySnapshot = await getDocs(vansCollectionRef);
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));

	return dataArr;
}

export async function getVan(id) {
	const docRef = doc(db, "vans", id);
	const vanSnapshot = await getDoc(docRef);
	return {
		...vanSnapshot.data(),
		id: (await vanSnapshot).id,
	};
}

export async function getHostVans() {
	const q = query(vansCollectionRef, where("hostId", "==", "123"));
	const querySnapshot = await getDocs(q);
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));

	return dataArr;
}

export async function loginUser(creds) {
	const res = await fetch("/api/login", {
		method: "post",
		body: JSON.stringify(creds),
	});
	const data = await res.json();

	if (!res.ok) {
		throw {
			message: data.message,
			statusText: res.statusText,
			status: res.status,
		};
	}

	return data;
}
