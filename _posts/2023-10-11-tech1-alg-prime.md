---
title: "소수구하기 에라토스테네스의 체"
categories:
  - Alg
tags:
   
last_modified_at: 2023-10-10T00:25:52-01:00
---

## 에라토스테네스의 체

특정 수까지의 소수를 구할 때 최적화 알고리즘이다.

## 기본적인 원리

1 ) 2부터 시작해서 자신의 배수가 되는 숫자를 지운다.
2 ) 남아있는 수 가운데 가장 작은 수를 골라 소수리스트에 넣고 (실제 구현시 넣을 필요 없이 지워지지 않은 숫자를 소수로 취급한다 (boolean 배열 사용)) 배수가 되는 숫자를 지운다.
3 ) 반복

## 구현

```Java
public class CheckIsPrimeNumber {

	static void prime(int N) {
		
		boolean [] isPrime = new boolean[N+1];
		
		Arrays.fill(isPrime, true);
		isPrime [0] = isPrime [1] = false;
		
		for(int i=2;i*i<=N;i++) {
			if(isPrime[i]) {
				for(int j=i*i;j<=N;j+=i) {
					isPrime[j]= false;
				}
			}
		}
		// 1 ~ 120 사이의 소수 출력
		for(int i=1; i<=N ;i++){
			if(isPrime[i]) System.out.print(i+" ");        
		}
		
	}
	public static void main(String[] args) {
		prime(120);

	}

}

```