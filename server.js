const http = require("http");

class Casper {
  constructor() {
    this._routeTable = {
      get: [],
      post: [],
      put: [],
      delete: [],
    };

    this.server;
  }

  serve() {
    this.server = http.createServer((req, res) => {
      res["send"] = this._send(res);
      switch (req.method.toLowerCase()) {
        case "get":
          this._handleGetRoute(req, res);
          break;
        case "post":
          this._handlePostRoute(req, res);
          break;
        case "put":
          this._handlePutRoute(req, res);
          break;
        case "delete":
          this._handleDeleteRoute(req, res);
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.write("No HTTP Request Found");
          break;
      }
    });
  }

  listen(port, cb) {
    return this.server.listen(port, cb);
  }

  _send(res) {
    return (data, status = 200, contentType = "text/plain") => {
      res.writeHead(status, { "Content-Type": contentType });
      res.end(JSON.stringify(data));
    };
  }

  // Get
  get(path, cb) {
    let pathName = this._routeTable?.get?.filter((el) => el.path === path);
    if (pathName.length === 0) {
      this._routeTable.get = [
        ...this._routeTable.get,
        {
          path,
          handler: cb,
        },
      ];
    }
  }
  // HANDLE GET ROUTE
  _handleGetRoute(req, res) {
    const queryparams = req.url.split("?");
    const route = this._routeTable.get.filter(
      (el) => el.path === queryparams[0]
    )[0];

    if (route === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found.");
      return;
    }

    let query = queryparams[1]?.split("&");

    let allQuery = {};

    query?.forEach((param) => {
      const params = param.split("=");
      allQuery[params[0]] = params[1];
    });

    req["query"] = allQuery;
    route.handler(req, res);
  }

  // post
  post(path, cb) {
    let pathName = this._routeTable.post.filter((el) => el.path === path);
    if (pathName.length === 0) {
      this._routeTable.post = [
        ...this._routeTable.post,
        {
          path,
          handler: cb,
        },
      ];
    }
  }
  // HANDLE POST ROUTE
  _handlePostRoute(req, res) {
    const queryparams = req.url.split("?");
    const route = this._routeTable.post.filter(
      (el) => el.path === queryparams[0]
    )[0];

    if (route === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found.");
      return;
    }

    let query = queryparams[1]?.split("&");

    req.on("data", (chunk) => {
      let body = chunk.toString();
      req.body = JSON?.parse(body);

      let allQuery = {};

      query?.forEach((param) => {
        const params = param.split("=");
        allQuery[params[0]] = params[1];
      });

      req["query"] = allQuery;
      route.handler(req, res);
      return;
    });
  }

  // put
  put(path, cb) {
    let pathName = this._routeTable.put.filter((el) => el.path === path);
    if (pathName.length === 0) {
      this._routeTable.put = [
        ...this._routeTable.put,
        {
          path,
          handler: cb,
        },
      ];
    }
  }
  // HANDLE PUT ROUTE
  _handlePutRoute(req, res) {
    const queryparams = req.url.split("?");
    const route = this._routeTable.put.filter(
      (el) => el.path === queryparams[0]
    )[0];

    if (route === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found.");
      return;
    }

    let query = queryparams[1]?.split("&");

    req.on("data", (chunk) => {
      let body = chunk.toString();
      req.body = JSON?.parse(body);

      let allQuery = {};

      query?.forEach((param) => {
        const params = param.split("=");
        allQuery[params[0]] = params[1];
      });

      req["query"] = allQuery;
      route.handler(req, res);
      return;
    });
  }

  // delete
  delete(path, cb) {
    let pathName = this._routeTable.delete.filter((el) => el.path === path);
    if (pathName.length === 0) {
      this._routeTable.delete = [
        ...this._routeTable.delete,
        {
          path,
          handler: cb,
        },
      ];
    }
  }
  // HANDLE PUT ROUTE
  _handleDeleteRoute(req, res) {
    const queryparams = req.url.split("?");
    const route = this._routeTable.delete.filter(
      (el) => el.path === queryparams[0]
    )[0];

    if (route === undefined) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route Not Found.");
      return;
    }

    let query = queryparams[1]?.split("&");

    let allQuery = {};

    query?.forEach((param) => {
      const params = param.split("=");
      allQuery[params[0]] = params[1];
    });

    req["query"] = allQuery;
    route.handler(req, res);
  }
}

module.exports = Casper;
