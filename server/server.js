/* note omkesh in node js when you use type : modules then while importing use extension of file , this exception in react js */

import app from "./app.js";

const PORT = process.env.PROT || 5010;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
