

Useful docker commands
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

Useful lodash methods

# Array

_.compact(arr) - removes all falsey values from an array
_.chunk(arr,chunksize) - turns an array into arrays of chunks of certains size



#mongoose 


SQL Terms, Functions, and Concepts	MongoDB Aggregation Operators
WHERE	$match
GROUP BY	$group
HAVING	$match
SELECT	$project
ORDER BY	$sort
LIMIT	$limit
SUM()	$sum
COUNT()	
$sum
$sortByCount
join	$lookup

#returns promise
Model.create()

#returns queries
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()

#mongooose populate sort fix using aggregate
Participant
    .aggregate([{
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData"
            }
        },
        {
            $unwind: "$userData"
        }
    ]).sort({
        "userData.name": 1
    }).exec()