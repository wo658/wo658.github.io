---
title: "TCP"
categories:
  - Network
tags:
   
last_modified_at: 2023-07-14T00:25:52-01:00
---

## TCP overview

점대점 , one sender <-> one receiver
flow controlled , sender 가 receiver 를 초과하지 않게 제어
pipelining , congestion , flow control 이 window size 를 설정.

## TCP segement structure

sequence number를 byte 별로 붙임. 패킷 별로 가장 작은 sequence number를 기준으로 패킷의 순서를 정함. segement의 수 대로 sequence number가 증가하는 개념이 아닌 MSS 단위로 증가하게 된다. 즉 하나의 segement에는 MSS 개의 byte 번호가 들어감

Acknowledgment number , ACK number 필드로 수신자가 다음에 받을 것으로 예상되는 sequence number 가 저장. 즉 다음으로 받을 segement 의 가장 작은 sequence number 가 들어간다.

receive window , 수신자 입장에서 남은 버퍼의 크기를 알려줘 flow control을 도와준다.

## TCP rtt , timeout 

타임아웃이 RTT보단 커야하는데 RTT가 매번 변하기 때문에 타임아웃을 정확히 정하기 힘들다.

too short -> 불필요한 재전송이 너무 많아짐.
too long -> segement loss 시 재전송이 너무 느려짐 . 대기시간이 너무 길어진다.

SampleRTT => 새그먼트 전송부터 ACK receipt 까지의 시간을 평가. ( 재전송은 무시 )

EstimatedRTT = ( 1- a ) *EstimatedRTT + a*SampleRTT 로 구한다.

타임아웃 간격을 EstimatedRTT + 4*DevRTT 로 설정.
EstimatedRTT 에 safty margin을 더해서 설정한다.

DevRTT 는 SampleRTT의 변동에 따라 설정.

## TCP Sender 

3 가지 evnet로 나뉘어진다.
- application 계층으로 부터 데이터를 받는다.
- timeout 발생
- ACK 받은 경우

## TCP Receiver : ACK generation

받지 못한 SequenceNumber 의 가장 낮은값을 요구. Sender 입장에서 3번의 중복 ACK를 받을 경우 타임아웃 되지 않아도 LOSS를 유추할 수 있다.

## TCP flow control

필요 이유 -> TCP scoket receiver buffers 에 전송되는 데이터가 application layer 로 나가는 데이터보다 많으면 overflow 발생 위험이 존재한다. 

목적 -> overflow가 나지 않음을 보장해야 한다.

## 2-way handshake 

만약 ACK가 지연되서 오는 경우 2중연결이 일어날 수 있다. + 중복 데이터를 받을 가능성도 있음.

## 3-way handshake

sender 가 SYN 을 보내고
SYN 과 Ack 를 받고 ACK만 다시 보낸다.

Closing 할 때는 4-way 사용.

## Pinciples of Congestion 

1 . 라우터의 버퍼가 무한한 경우 .

Host A , Host B 를 가정할 때 전송률의 호스트 수로 나눈 만큼 전송된다.
 
2 . 라우터의 버퍼가 유한한 경우.

버퍼가 유한한 경우 버퍼가 가득 차서 재전송해야 하는 경우가 생길 수 있음 

전송률이 R/2 에 살짝 못미치게 설정된다. ( in,out 이 R/2 보다 많이 낮아 여유로울 때는 상관없지만 R/2로 가까워지면 in 에 비해 Out이 줄어들게 됨)

거기에 + 현실적인 시나리오를 생각하면 delay 때문에 timeout 되서 추가적인 패킷을 보낼 수 있다 in 에 비해 Out은 더 줄어들게 됨. (불필요한 중복 전송)

이는 costs of congestion 으로 이어진다.

심지어 HOST 와 라우터의 수가 많아지고 복잡해 질수록 이 비용은 더욱 증가한다. 

## Congestion control 제어 방법

End-end congestion control 엔드시스템 끼리 해결하는 방법

Network-assisted congestion control 라우터에서 버퍼의 빈공간을 알려주는 방법

end-end 

end-end 에서 Congestion detect 를 하는 방법
1 . 타임아웃
2 . 3 duplicated ACK

Sending 조절 
congestion window(cwnd) 를 조절함으로서 조정

알고리즘
AIMD를 사용 올릴 때는 천천히 떨어트릴 때는 이산적으로 한번에.

## AIMD 

end-end 로 전송률을 제어하는 방법.
Additive increase/multiplicative decrease
duplicated ACK 3 => 절반
T/O => 1MSS 

전송률을 올릴때는 1씩 선형적으로 올린다.

Tahoe -> 초기 version T/O 와 triple duplicate ACK 를 동일 취급

Reno -> T/O 의 경우 동일하게 1MSS로 초기화 하지만 triple duplicate ACK 의 경우 전송률을 half로 나눈다.

cwnd 단위로 보낸다.

## TCP slow start

RTT 마다 cwnd를 2배씩 증가시킨다.

slowstart 로 시작하다가 ssthresh 지점에 도달하면 다시 선형적으로 전송률을 증가시킨다.

ssthersh 는 loss event 발생시 cwnd를 기본적으로 1/2로 설정한다. 단 3duplicated ack 일 때는 cwnd 를 ssthresh +3 으로 설정.

Congestion Avoidance = slowstart 상태에서 ssthresh 지점을 만나 선형적으로 증가하는 상태

fast recovery = duplicate ack 3 가 되어 cwnd = ssthresh +3 로 설정된 상태 중복 ack가 아닌 새로운 ACK가 들어오면 cwnd를 다시 ssthresh 로 설정하고 dupACKcount = 0 

만약 NewACK가 오지않고 T/O 될 경우 ssthresh = cwnd/2 로 cwnd =1로 즉 SlowStart 상태로 넘어간다.

slowstart 상태에서 fast recoveryq

## TCP CUBIC

기본적인 전략 -> Wmax 지점까지 선형적으로 증가시키는 것이 아닌 로그적으로 증가시키자.

Wmax 가 발생한 시간을 K라고 하면 증가율을 K랑 가까워질 수록 줄여가면서 설정. 만약 Wmax 지점을 넘어설 경우 멀어질수록 증가율 지수적으로 증가.
