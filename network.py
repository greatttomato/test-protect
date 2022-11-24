# 소켓 프로그래밍에 필요한 API 제공
import socket

ip = 'localhost'
port = 50001

# 소켓 객체 생성
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 서버와 연결
client_socket.connect((ip, port))
print("[연결 성공]")

# 서버로 데이터 전송
message = input("보낼 메시지: ")
client_socket.send(message.encode("UTF-8"))

# 서버로부터 데이터 수신
data = client_socket.recv(1024).decode("UTF-8")
print("받은 메시지:", data)

# 소켓닫기. 닫아주지 않으면 계속 열려있음
client_socket.close()
print("[연결 종료]")
