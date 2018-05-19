#!/bin/bash
MYCSS="../../../../../../game/css/appicons.css";

echo "" > $MYCSS;

ls -1au *.png | while read FILE
do
  CLASS=`echo $FILE | sed 's/.png//'`;
  echo -en ".icon-$CLASS {" >> $MYCSS;
  echo -en " background:url('../../sites/all/themes/creative_responsive_theme/images/icons/$FILE') no-repeat center center; " >> $MYCSS;
  echo "}" >> $MYCSS;
  echo $FILE
done
