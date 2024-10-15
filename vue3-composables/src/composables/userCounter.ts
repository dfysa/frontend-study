import { ref } from "vue";

export function userCounter(initValue=0){
      //响应式变量 number ，初值为入参 initValue
    const count =ref<number>(initValue)

        const increment = ():void => {
          count.value++;
        };
        const decrement = ():void => {
          count.value--;
        };
           const reset = (): void => {
             count.value=0;
           };


        return{
            count,increment,decrement,reset
        }


}