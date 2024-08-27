import { CollectionReference, onSnapshot, query, QueryConstraint } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(
	colRef: CollectionReference<T>,
	...queryConstraints: QueryConstraint[]
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[] | null>(null);

	// subscribe to data
	useEffect(() => {
		// query reference
		const queryRef = query(colRef, ...queryConstraints);

		// subscribe
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			console.log("got snapshot")

			const data = snapshot.docs.map(doc => {
				return {
					...doc.data(),
					_id: doc.id,
				}
			});

			setData(data);
			setLoading(false);
		});

		// unsubscribe as cleanup
		return unsubscribe;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [colRef]);

	return {
		data,
		loading,
	}
};

export default useStreamCollection;
