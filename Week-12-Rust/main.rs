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

fn main(){
    let mut str : String = String::from("Harpreet");
    let len: usize = get_length(&mut str);

    println!("{} {}", str, len);

    println!("{}", str);
}

fn get_length(str : &mut String) -> usize{
    str.push_str(&String::from("  harkirat"));
    return str.len();
}
