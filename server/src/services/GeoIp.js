import maxmind from 'maxmind';
import path from 'path';
import util from 'util';

const open = util.promisify(maxmind.open);

export const locate = async (ip)=>{
  return Promise.all([
    open(path.resolve(__dirname, '../', 'maxmind',
      'GeoLite2-City', 'GeoLite2-City.mmdb')),
    open(path.resolve(__dirname, '../', 'maxmind',
      'GeoLite2-ASN', 'GeoLite2-ASN.mmdb'))]
  ).then(([geoCity, arn])=>{
    return Object.assign({}, geoCity.get(ip), arn.get(ip));
  });
};

export default locate;
