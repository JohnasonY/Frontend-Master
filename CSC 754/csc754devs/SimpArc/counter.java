package SimpArc;

import simView.*;

import java.lang.*;
import genDevs.modeling.*;
import genDevs.simulation.*;
import GenCol.*;

public class counter extends siso{
protected double count;
protected double response_time;

  public counter(){
    super("counter");
    addInport("in");
    addOutport("out");
AddTestPortValue(1);
AddTestPortValue(0);
}

public counter(String name,double Response_time){
   super(name);
   response_time = Response_time;
   count=0;
}

public void initialize(){
     phase = "passive";
     sigma = INFINITY;
     response_time = 0;
     super.initialize();
 }


public void  Deltext(double e,double input){
    Continue(e);
    if (input != 0)  // 0 is query
    count++;
    else holdIn("respond", response_time);
}



public void  deltint( ){
    passivate();
}


public double sisoOut(){
  if (phaseIs("respond"))  return count;
  else return 0;
}

 public void showState(){
  super.showState();
  System.out.println("The number of non-zero input is: " + count);
 }



}