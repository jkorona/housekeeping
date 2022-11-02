import { useEffect, useState } from "preact/hooks";
import { getDuties } from "clients/duty";

const STORAGE_KEY = "HOUSEKEEPING_DUTIES";

function getFromCache() {
  const stringData = sessionStorage.getItem(STORAGE_KEY)
  if (stringData) {
    return JSON.parse(stringData);
  }
  return null;
}

function setToCache(data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function useDuties() {
  const [duties, setDuties] = useState([]);

  useEffect(() => {
    const cached = getFromCache();

    if (cached) {
      setDuties(cached);
    } else {
      getDuties().then((data) => {
        setToCache(data);
        setDuties(data);
      });
    }

  }, []);

  return duties;
}

export default useDuties;
