/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-13 17:29:07
 * @LastEditors: went
 * @LastEditTime: 2022-07-14 10:13:06
 */

const requireAll = (requireContext:any) =>
  requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);
