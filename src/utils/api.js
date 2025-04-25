const baseUrl = "http://localhost:3001";
const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  });
};

const newItems = (inputData = {}) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputData.name,
      imageUrl: inputData.imageUrl,
      weather: inputData.weather,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  });
};

const deleteItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Error: ${res.status}`));
  });
};
export { getItems, newItems, deleteItems };
