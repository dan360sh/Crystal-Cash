import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MemoryService {


  save( key: string, value: any ): void{
    try {
      (window as any).chrome.storage.local.set({ key: value });
    }catch (e){
      (window as any).localStorage.setItem(key, value);
    }
  }

  getValue(key: string): any{
    try {
      return  (window as any).chrome.storage.local.get(key).token;
    }catch (e){
      return (window as any).localStorage.getItem(key);
    }
  }

  async remove(key: string): Promise<void>{
    try {
      return (await (window as any).chrome.storage.local.remove(key));
    }catch (e){
      return (await (window as any).localStorage.removeItem(key));
    }
  }
  async removeAll(): Promise<void>{
    try {
      return (window as any).chrome.storage.local.clear();
    }catch (e){
      return (window as any).localStorage.clear();
    }
  }

}
