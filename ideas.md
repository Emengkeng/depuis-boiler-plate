# make users be able to pay card monthly fee with a one year plan
# with a discount

# TODO
-- Make sure user deposit one time with creation of card
For now, when the user creates the card we only charge the user card fee. We need to add the option for the user to deposit and charge him from his account

--- Add option to terminate a card

--- in creatcard.js(service folder)
line 467
Make sure only admin can create this card

line 525
Add budget controls setting
either on the DB or here


--- Add points option 
for each card creation and transaction, users earn points. For card creation, the point will vary depending on the card type. 

--- Give the user the ability accept a gift card 
1.When a user gifts a card, the reciever should choose wether to accept the card or reject it. For now the card is forcely added to the reciever 
2.The gifter should also choose who is going to pay the monthly fee for the card 

# Mailing
- add signup welcome mail
- add card, deposit, withdrawal and account to account transaction mail
- add Create card mail
- add gift card mail




# Logic Check
- Make sure the hasEnoughBalance function in user.service.js is working properly when called in creatcard.service.js and other files