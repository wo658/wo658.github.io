---
title: "자바 우선순위 큐와 입출력 팁"
categories:
   
tags:
  - Java
last_modified_at: 2023-07-28T00:25:52-01:00
---

## 우선순위 큐

우선적으로 우선순위 큐의 경우 

    PriorityQueue<Integer> myQueue = new PriorityQueue<Integer>();

이 기본적인 사용법인데 우선순위큐는 당연하게도 우선순위를 가지게 되고 이 우선순위는 기본으로 두면 낮은 값이 우선순위를 갖게 되는데 이 우선순위를 단순히 수 정렬이 아닌 커스텀화 시키는 경우의 활용법은 다음과 같다.

		PriorityQueue<Integer> myQueue = new PriorityQueue<Integer>( (o1,o2) ->{
			int abs1 = Math.abs(o1);
			int abs2 = Math.abs(o2);
			if( abs1 == abs2)
				return o1 > o2 ? 1 : -1; // 양수인지 음수인지에 따라 o1,o2의 지정자가 정해진다
			return abs1 - abs2;   		// 우선순위큐의 우선순위 지정은 2인자가 + 인지 - 인지에 따라 결정
	
		});

다음 예제는 절대값이 작은 순서에 따라 우선순위를 가지며 절대값이 같은 경우 음수가 우선순위를 갖는 코드이다.

내부적 작동으로는 양수가 리턴될 시 두번째 입력변수가 우선순위를 가지고 음수가 리턴될 시 첫번째 입력변수가 우선순위를 가지게 된다.

## 입출력

int , long을 사용하면 길이 제한이 있기 때문에 입력이 길어질 경우 입력을 받을 때 String으로 입력을 받는게 유리할 수 있다.
