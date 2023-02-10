/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-09 10:26:20
 * @LastEditors: went
 * @LastEditTime: 2023-02-10 11:08:55
 */
import {  defineClientConfig } from "@vuepress/client";
// @ts-ignore
import uiDesign from "../../packages/ui/src/index";
export default defineClientConfig({
    enhance({app}){
        app.use(uiDesign);
    }
})
