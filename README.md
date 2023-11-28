# CUPA Frontend Test - Dan Foad


Assumptions:
 - To make the logic easier, the assumption is that activities that have the rounds property set will always have >1 rounds

Future Work:
 - Exposing the answers to the frontend in this way opens the way for cheating, would be better to server-side render the content so that the API data is never exposed
 - Similarly, evaluating and storing the user's results in the frontend opens another avenue for cheating that server-side rendering wouldn't solve. It'd be better to have a backend that collects answers and returns the results.