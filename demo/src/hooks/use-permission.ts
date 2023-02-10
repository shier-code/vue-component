/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-01-10 15:22:43
 * @LastEditors: went
 * @LastEditTime: 2022-01-10 16:40:31
 */
import { useStore } from "@/store";

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item: any) => item === verifyPermission);
}
