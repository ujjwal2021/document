
import java.util.Scanner;

class Test {
    public static void main(String args []){
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the number of elements in an array: ");
        int num = sc.nextInt();
        System.out.println("Enter " + num + " numbers: ");
        int arr[] = new int[num];
        for (int i=0; i< num; ++i){
            arr[i]= sc.nextInt();
        }
        sc.close();

        int product = 1;
        System.out.println("Even numbers in an array: ");
        for (int i : arr){
            product *= i;
            if( i%2 == 0){
                System.out.print(i + "\t");
            }
        }
        System.out.println();
       System.out.println("The product of all element is " + product);
    }
} 