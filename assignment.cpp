#include <string>
using namespace std;
class Car {
    public: string brand;
    string model;
    int year;
    
}


int main(){
    Car carObj;
    carObj.brand = "BMW";
    carObj.model = "X5";
    carObj.year = 2019;


    Car carObj2;
    carObj2.brand = "Ford";
    carObj2.model = "Mustang";
    carObj2.year = 2019;

    cout << carObj.brand << " " << carObj.model << " " << carObj.year << "\n";

     cout << carObj2.brand << " " << carObj2.model << " " << carObj2.year << "\n";

     return 0;
}