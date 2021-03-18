## Known issues
- questions are repeating (question about Germany pops up with gap in 1 q)
* countries w/o capital omitted (need to check why is that)
* weird bug with type array (used direct mutating instead of setType)

## 14.03
remove countries w/o capital from questions about capitals

## 15.03
tasks:
* if picked object w/o capital, pick flag question
	if country question only, omit this object

## 17.03
- rename/create matching .css files for pages/components
- fix disabling buttons when an answer has been chosen


known bugs and other stuff:
* when an answer has been chosen, buttons remain active; correct counter updates on each click
* rename callback functions (add `set` to them)