---
title: "C++ 스트링"
categories:
   
tags:
  - C++
last_modified_at: 2023-10-12T00:25:52-01:00
---

## 스트링 선언

string str;

cin >> str; 공백이전까지 문자열 입력

getline(cin,str); '\n' 개행문자 이전까지의 문자열 통째로 입력

## 스트링 접근

str.at(index)
str[index]
str.front() str.back()

## 스트링 크기

str.length() 길이반환


## 스트링 삽입,추가,삭제

str.append(str2)
str.append(str2,n,m)
str.celar()
str.push_back()
str.pop_back()

## 스트링 정렬

 reverse(my_string.begin(),my_string.end()); 
 순서를 역으로 정렬

 sort(my_string.begin(),my_string.end()); 
 알파벳 내림차순으로 정렬

## 기타 멤버 함수

str.substr(n)   n번째부터 끝까지 문자를 반환
str.substr(n,length) n번째부터 length만큼 길이를 반환
substr 중 만약에 length 가 str 의 사이즈를 초과하는 경우 끝까지만 반환한다.(컴파일 에러 나지 않음)
str.compare(str2) 같다면 0 str<str2 면 음수

## 기타 문자열 관련 정리

" , ' 를 출력할때는 앞에 개행문자를 넣어주자.

"  " ,' ' 가 취급이 다르다 C++에서는 '' <- 문자
"" <- 문자열

replace(str.find(find_str) , find_str.length() , "") 
1번 파라미터는 문자열의 위치를 넣고 2번 파라미터는 대체할 문자열 길이 3 번 파라미터는 대체할 문자열을 넣는다.

to_string


## 문자열 벡터

{ " ", " "," " }
쉼표로 묶인 문자열 모음이 나올때는 vector로 한번에 묶어서 처리 가능하다.
그리고 find , replace 개념 제대로 알자 find의 경우 찾지 못하면 string::npos를 반환한다.

## 문자열 slice

공백 기준 문자열 슬라이스는 기본적으로 #include<sstream>

    string str="java c c++ python";

    
    istringstream ss(str);
    string stringBuffer;
    vector<string> x;
    x.clear();


    cout<<"어떻게 잘리는지 확인해봅시다 ->";
    //구분자가 , 이라면 getline(ss, stringBuffer, ',')쓰면됨


    while (getline(ss, stringBuffer, ' ')){
        x.push_back(stringBuffer);
        cout<<stringBuffer<<" ";
    }

    cout<<endl<<"vector 값을 출력해보자."<<endl;
    
    for(int i=0;i<x.size();i++){
        cout<<x[i]<<endl;
    }
    
    코드 출처)https://chbuljumeok1997.tistory.com/42

