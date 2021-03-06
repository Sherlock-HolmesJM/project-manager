import ProjectType from "../types/projectType";

import http from "./httpService";
import log from "./logService";

import store from "../store";
import { typeAdded, typesAdded, typesCleared } from "../store/projectTypes";

const apiEndpoint = "projectTypes";
const getReference = () => http.fs().collection(apiEndpoint);

function addListener() {
  getReference().onSnapshot({
    next: (snapshot) => {
      const changes = snapshot.docChanges();

      if (changes.length > 1 && changes[0].type === "added") {
        const types = changes.map((change) => change.doc.data());
        return store.dispatch(typesAdded, { types });
      }

      changes.forEach((change) => {
        if (change.type === "added")
          store.dispatch(typeAdded, { type: changes[0].doc.data() });
      });
    },

    error: (error) => log(error),
  });
}

function add(type: ProjectType) {
  getReference()
    .doc(type.id)
    .set(type)
    .then(
      (value) => value,
      (reason) => log(reason)
    );
}

function get(id: string) {
  return getReference()
    .doc(id)
    .get()
    .then((doc) => doc.data() as ProjectType)
    .catch(log);
}

async function clear() {
  store.dispatch(typesCleared, { list: [] });

  return getReference()
    .get()
    .then(
      (value) => value.docs.forEach((doc) => doc.ref.delete()),
      (reason) => log(reason)
    );
}

const objects = {
  get,
  add,
  clear,
  addListener,
};

export default objects;
