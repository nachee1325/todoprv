from flask_pymongo import pymongo

def connect_to_db():
	try:
		client = pymongo.MongoClient()
		print "connected!"
	except pymongo.errors.ConnectionFailure, e:
		print "Could not connect to MongoDB: %s" % e