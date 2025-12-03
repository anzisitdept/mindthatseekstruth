import { getDocs, collection,  } from "firebase/firestore";    
import { db } from "../../lib/firebaseConfig";
    
    const booksCollectionRef = collection(db, "books");
    const querySnapshot = await getDocs(booksCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    export default data