import * as jwt from 'jsonwebtoken'

const generateDashboard = (resource, params) => {
  const METABASE_SITE_URL = process.env.METABASE_URL
  const METABASE_SECRET_KEY =
    '047e55e2fa75bf6795895deb7b3701a7c23f0113a3b66fb21778213aa5a37fe9'
  const payload = {
    resource: resource,
    params: params,
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  }
  const token = jwt.sign(payload, METABASE_SECRET_KEY)

  return (
    METABASE_SITE_URL +
    '/embed/dashboard/' +
    token +
    '#theme=night&bordered=false&titled=true'
  )
}

export default generateDashboard
