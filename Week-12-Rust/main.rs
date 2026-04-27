// fn main(){
//     println!("Hello World");
// }


// fn main(){
//     let x : i32 = 2000;
//     println!("{}", x);
// }

// TS Equivalent
// function main(){
//     let x : number = 1;
//     console.log(x);
// }

// main();

// fn main(){
//     let is_male : bool = false;

//     if is_male{
//         print!("{}",true);
//     }else{
//         println!("{}",false);
//     }
// }


// fn main(){
//     let mut greeting: String = String::from("hello world");
//     greeting.push_str(&String::from(" harkirat"));

//     println!("{}",greeting)
// }


// fn main(){
//     let arr: [i32; 5] = [1,2 ,3, 4, 5];
//     println!("{}", arr.len());
//     println!("{}", arr[0]);
// }

// fn main(){
//     let mut vec = vec![1,2 ,3, 4, 5];

//     print!("{}", vec.len());
// }

// fn do_sum(a: i32, b : i32) -> i32{
//     return a + b;
// }

// fn main(){
//     println!("{}", do_sum(1, 2));
// }

// fn main(){
//     let mut str : String = String::from("Harpreet");
//     let len: usize = get_length(&mut str);

//     println!("{} {}", str, len);

//     println!("{}", str);
// }

// fn get_length(str : &mut String) -> usize{
//     str.push_str(&String::from("  harkirat"));
//     return str.len();
// }



// fn main(){
//     let x = 1;
//     // x = "harkirat";
//     println!("Output: {}", x);
//     print!("Hello World");
// }

// fn main(){
//     let mut x : u32 = 100000;
//     x += 123;
//     println!("{}", x);

// }


// fn main(){
//     // let sentence = String::from("my name is harkirat");
//     // let first_word = get_first_word(sentence);
//     // print!("First Word is {}", first_word);

//     // let n = 10;
//     // for _i in 0..n{
//     //     println!("Hello World");
//     // }
//     // print!("First Word is: {}", first_word);


//     update_string();
// }

// fn get_first_word(sentence: String) -> String{
//     let mut ans = String::from("");
//     for char in sentence.chars(){
//         ans.push(char);
//         if char == ' ' {
//             break;
//         }
//     }

//     return ans;
// }

// fn update_string(){
//     let mut s = String::from("Initial String");
//     println!("Before Update: {}", s);
//     println!("Capacity: {}, Length: {}, pointer: {:p}", s.capacity(), s.len(), s.as_ptr());

//     for _ in 0..100{
//         s.push_str(" and some additional text");
//         println!("Capacity: {}, Length: {}, pointer: {:p}", s.capacity(), s.len(), s.as_ptr());
//     }
// }


// fn main(){
//     let s: String = String::from("Harkirat");
//     println!("{}", is_longer_than(&s, 1));
//     println!("{}", s);
// }

// fn is_longer_than(s: &String, num: usize) -> bool {
//     if s.len() > num{
//         return true;
//     }
//     else{
//         return false;
//     }
// }
#[derive(Debug)]
struct Address {
    city: String,
    pincode: usize,
    country: String

}
#[derive(Debug)]
struct User {
    name: String,
    age: u32,
    addresses: Vec<Address>,
}

// self -> non static fn, no self in fn parameter -> static

impl User {
    fn is_allowed_to_vote(&self, legal_age: u32) -> bool{
        if self.age >= legal_age{
            return true;
        }else{
            return false;
        }
    }

    fn who_am_i() -> String{
        return String::from("User struct");
    }
}

fn main(){
    let user1 = User{
        name: String::from("Harkirat"),
        age: 18,
        addresses: vec![Address {city: String::from("Chandigarh"), pincode: 123123, country: String::from("India")}]
    };

    let user2 = User{
        name: String::from("Raman"),
        age: 13,
        addresses: vec![Address {city: String::from("Chandigarh"), pincode: 123123, country: String::from("India")}]
    };

    println!("{}", user1.is_allowed_to_vote(18));
    println!("{}", user2.is_allowed_to_vote(32));

    println!("{}", User::who_am_i());

    // print!("{:?}", user1.addresses);
}


// fn is_allowed_to_vote(u: &User) -> bool{
//     if u.age >= 18{
//         return true;
//     }else{
//         return false;
//     }
// }


