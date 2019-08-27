
double presion;
double sensor_value;
int analogPin = A0;

void setup() {
  Serial.begin(9600);

}

void loop() {

  sensor_value = analogRead(analogPin);
  presion = sensor_value*0.00488758553;
  Serial.println(presion);
  delay(500);

}
