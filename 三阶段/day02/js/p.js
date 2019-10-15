function n1() {
    console.log(1);
}

function n2() {
    return new Promise((resolve, reject) => {
        console.log(2);
        resolve(111);
    });
}

function n3() {
    return new Promise((resolve, reject) => {
        console.log(3);
        resolve(222);
    });
}

function n4() {
    return new Promise((resolve, reject) => {
        // console.log(4);
        resolve(333);
    });
}

function n5(aa) {
    return new Promise((resolve, reject) => {
        console.log(aa);
        resolve(444);
    });
}
// n1();
// n2().then(n3).then(n4).then(n5);
// n2();
// n3();

n5(n4());
