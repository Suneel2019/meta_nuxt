import cookie from "cookie";

export default function getServerLocalStorage(context) {

  if (process.server) {

    if (context.req.headers.cookie) {

      const parsedCookies = cookie.parse(context.req.headers.cookie)

      if (parsedCookies['vuex']) {

        return JSON.parse(parsedCookies['vuex']);

      } else {

        return null;

      }

    } else {

      return null;

    }

  }

}
