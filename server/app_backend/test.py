myObjects = [0, 2, 8, 7, 1, 4, 3, 21]

myJson = {}
tempDict = {}

for anObject in myObjects:
    tempDict['img'] = "img" + str(anObject)
    myJson[anObject] = tempDict
    tempDict = {}

    print(myJson)
