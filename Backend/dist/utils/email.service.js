"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: env_1.env.EMAIL_HOST,
            port: env_1.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: env_1.env.EMAIL_USER,
                pass: env_1.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    sendOtp(to, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `"SprachWeg" <${env_1.env.EMAIL_USER}>`,
                to,
                subject: 'Your Verification OTP',
                text: `Your OTP is: ${otp}. It is valid for 3 minutes.`,
                html: `<p>Your OTP is: <b>${otp}</b>. It is valid for 3 minutes.</p>`,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log(`OTP sent to ${to}`);
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Email service failed');
            }
        });
    }
}
exports.EmailService = EmailService;
