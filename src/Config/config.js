
let base = (process.env.NODE_ENV === "development") ? "http://localhost:8000" : "https://api.marcelli.ca";

let Config = {
  api: {
    base: base
  }
}

export default Config;
