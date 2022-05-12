import apis from "../api/api_list.js";
import {purifyData,memoizeFetch} from "../api/api_call.js";

const mainTitle = document.querySelector(".home-left .main-title")
const homeTagline = document.querySelector(".home-left .tagline")
const about = document.querySelector(".footer-company .top .description")
const phone = document.querySelector(".infos .inner .contact-info span")
const email = document.querySelector(".infos .inner .mail-info span")
const address = document.querySelector(".infos .inner .address-info span")
