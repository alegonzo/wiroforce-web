import * as jwt from 'jsonwebtoken';

const generateDashboard = (resource, params) => {
    const METABASE_SITE_URL = process.env.METABASE_URL;
    const METABASE_SECRET_KEY = "d0f6385a7663d712bf8709fa4a659b4a6611648e130ded0eac173c967cc8fc70";
    const payload = {
        resource: resource,
        params: params,
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    const token = jwt.sign(payload, METABASE_SECRET_KEY);

    return METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
}

export default generateDashboard;