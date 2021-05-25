import * as jwt from 'jsonwebtoken';

const generateDashboard = (resource, params) => {
    const METABASE_SITE_URL = process.env.METABASE_URL;
    const METABASE_SECRET_KEY = "2c3ae795a357276b05b110b54d6e729546f9ab79d48ca213ca6a39d1d7c94314";
    const payload = {
        resource: resource,
        params: params,
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    const token = jwt.sign(payload, METABASE_SECRET_KEY);

    return METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
}

export default generateDashboard;