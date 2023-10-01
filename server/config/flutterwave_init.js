import Ravepay from "flutterwave-node";
import dotenv from 'dotenv';


dotenv.config();

const rave = new Ravepay(process.env.PUBLICK_KEY, process.env.SECRET_KEY, false);

export default rave;