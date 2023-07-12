---
title: "자바 콜렉션 정리"
categories:
   
tags:
  - Java
last_modified_at: 2023-07-11T00:25:52-01:00
---

## 자바 컬렉션 프레임워크란?

Java util 에 들어있는 자료구조의 모임

![image](https://media.geeksforgeeks.org/wp-content/uploads/20230124151239/Collections-in-Java-768.png)

기본적인 구조의 모습이다. 자료구조와 데이터를 처리하는 알고리즘을 구조화하여 클래스로 구현해 놓은 것이다. 인터페이스 , 구현 , 알고리즘을 포함한다.

크게 collection 과 map으로 나눈다 collection 은 단일데이터를 처리 , map은 key와 데이터가 쌍으로 이루어져 처리된다.

## List 인터페이스

ArrayList,LinkedList,Vector,Stack 등이 있다.

이 중에서 Vector의 경우 호환을 위해 남겨둔 클래스 같은 존재로 현재는 성능이 좋지 않아 사용하지 않는다.

Stack의 경우 후에 나올 Deque로도 사용이 가능해 그 방식을 사용하는 것이 좋다.

기본적인 리스트의 역할을 하는 클래스는 ArrayList와 LinkedList 이다. 둘 다 기본적으로 다양한 메서드가 내장되어 있고 크기가 가변적인 동적 리스트이다.

ArrayList의 경우 배열로 관리되기 때문에 상대적으로 검색에 용이하나 데이터의 삭제,추가 시 불리하다.

반대로 LinkedList의 경우 연결리스트로 관리되어 검색이 성능상 불리하나 데이터의 삭제,추가 시 데이터를 복사 할 필요가 없기때문에 유리하다.

## 사용 예시

선언

    ArrayList<T> members = new ArrayList<T>(); 
    LinkedList<Integer> list = new LinkedList<Integer>(); 

Integer란 ? <T> 제너릭스에 들어가는 타입은 객체 타입이어야 하기 때문에 int를 객체화 시킨 wrapper클래스 Integer를 사용해야 한다.


순회

순회의 경우 반복자를 사용하는 경우 , 사용하지 않는 경우로 나뉜다.

순회 1 (for문)

    for(Integer i : list) { 
    System.out.println(i);} 

순회 2 (while문)

    Iterator iter = list.iterator(); 
    while(iter.hasNext()){
    System.out.println(iter.next());
    }  	

## Queue 인터페이스

자료구조 Queue와 동일하다.

1 . Priority Queue (우선순위 큐)

2 . ArrayDeque (사이즈 제한 없는 가변 배열)

우선순위 큐는 FIFO 방식이 아닌 특정 우선순위에 따라 삭제되는 자료구조형이다. Defalut로 낮은 숫자가 우선순위를 갖는다.

ArrayDeque는 Queue와 Stack 동시에 사용 가능하다. Deque 로 원형 큐 방식으로 구현되었으며 양쪽에서 입출력이 가능하다. 일반적으로 Stack 목적으로 구현시 이것을 사용한다.

## 사용 예시

    PriorityQueue<Integer> pq = new PriorityQueue<>();

순회

    for (int value : pQueue) {
    System.out.println(value);
    }

    Iterator iterator = pQueue.iterator();
        while (iterator.hasNext()) {
            int value = iterator.next();
            System.out.println(value);
    }


## Set 인터페이스

Set이란 쉽게말해 집합으로 중복을 자동으로 제거해주며 인덱스가 존재하지 않는 비선형구조의 자료구조이다.
HashSet, LinkedHashSet, TreeSet 이 있다.
HashSet은 Hash함수를 이용해서 중복을 검사한다.
TreeSet은 트리구조로 이루어져 있어 추가 삭제는 시간이 더 걸리지만 정렬,검색에 더 높은 성능을 지닌다.
LinkedHashSet은 HashSet이 순서를 가지고 있는 자료구조 형이다.

## 사용 예시

    TreeSet<Integer> set2 = new TreeSet<>();
    HashSet<Integer> set2 = new HashSet<>();
    LinkedHashSet<Integer> i2 = new LinkedHashSet();

## Map 인터페이스

Map이란 중복이 없고 데이터 순서도 없지만 Key가 존재해 Key로 value값을 탐색할 수 있는 방식이다.Key가 존재하기 때문에 탐색이 빠르다.

HashTable, HashMap, LinkedHashMap, TreeMap 이 있다.

HashTable 은 Key,Value 가 NULL이면 안된다.
HashMap 은 정렬되지 않은 Map을 제공.
LinkedHashMap 은 입력순서대로의 저장순서를 보장하는 Map이다.
TreeMap 은 정렬된 Map을 제공하고 Key를 기준으로 원하는 방식으로 정렬된다.

## 마무리

배열과 연결리스트의 차이점을 잘 생각하면 두가지로 파생되는 자료구조들을 특정 상황에 무엇을 사용하는 것이 유리한지 알 수 있다.