import {I18nResolver} from "i18n-ts";
import { locale } from "expo-localization";
import { en } from "./en";


const languages = {
    en,
    default:en
}

export const messages = new I18nResolver(languages, locale).translation

