---
title: "C++벡터"
categories:
   
tags:
  - C++
last_modified_at: 2023-10-12T00:25:52-01:00
---
## 벡터란 ?

벡터는 리스트와 달리 배열적인 메모리 구조를 가지지만 동적으로 사용가능한 배열이라고 생각하면 된다.

## 벡터 선언 및 초기화

vector<자료형> 변수명   // 기본적인 방법
vector<vector<자료형>> 변수명 // 2차원 벡터

## 벡터 반복자

v.begin() 벡터의 시작점 주소
v.end() 벡터 끝 부분 주소


## 벡터 요소 접근

v.at(i) 벡터의 i번 요소 접근
v[i] 벡터의 i번 요소 접근
v.front() v.back() 첫 , 끝 접근

## 벡터에 요소 삽입

v.push_back(0) 벡터의 마지막에 0 삽입.
v.push_front(0) 벡터의 처음에 0 삽입.
v.insert(v.begin() + 5 )  같은 식으로 원하는 인덱스에 삽입 가능


## 벡터 요소 삭제

v.erase(v.begin() + i);
erase 함수를 이용해서 지운다. 인자의 접근 시 i번째(배열인덱스)인덱스를 벡터의 begin 주소에 더하는 식으로 접근한다.


## 벡터 정렬

#include algorithm 후 sort 함수를 사용 가능하다.
벡터의 경우 sort(v.begin(),v.end()) 로 사용가능하면 오름차순으로 정렬이 된다.

내림차순 ->compare 함수 정의해서 만들어주거나 or  greater<>() 객체 추가.

## auto 반복자 사용

v라는 벡터가 존재할 때.

for(auto it = v.begin(); it != v.end(); ++it)

{

*it *= 2;

}

## 2차원 벡터

선언 = vector < vector <int> > v;
사용할 때는 vector <int> 즉 벡터를 통째로 하나 씩 2차원 벡터에 넣어준다는 느낌으로 사용하면 된다.