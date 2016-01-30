var url = "php/"

function getUser(userID, email, password) {
	var result = null;
	if(userID != null && password != null) {
		result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {userID: userID, password: password}
		});
		return result.responseJSON;
	} else if(email != null && password != null) {
		result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {email: email, password: password}
		});
		return result.responseJSON;
	} else if(userID != null) {
		result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {userID: userID}
		});

		return result.responseJSON;
	} else if (email != null) {
		result = $.ajax({
			url: url+"user", 
			async: false,
			method: "GET",
			data: {email: email},
			success: function(result) {
				console.log(result)
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.responseText)
			}
		});
	}
	return result.responseJSON;
}

function storeUserBackend(email, password, firstName, lastName, async, callback) {
	var result = $.ajax({
		url: url+"user", 
		async: async,
		method: "POST",
		data: {email: email, password: password, firstName: firstName, lastName: lastName, async: async},
		success: function (data) {

			callback(data);            
		},
		error: function (xhr, ajaxOptions, thrownError) {

		}
	});
}

function getGameFile(gameID,callback) {
	var result = $.ajax({
		url: "/problems/storage/"+gameID+".tr",
		async: false,
		success: function(data) {
			meta = data.split('\n')[0].split(' ').map(parseFloat)
			restOfFile = data.substring(data.indexOf("\n") + 1)
			callback(meta[0],meta[1],meta[2],restOfFile)
		}
	});
}


function storeUserSession(userID, email, password, async) {
	if(userID != null && password != null) {
		var result = $.ajax({
			url: url+"session", 
			async: async,
			method: "POST",
			data: {userID: userID, password: password}
		});
	} else if(email != null && password != null) {
		var result = $.ajax({
			url: url+"session", 
			async: async,
			method: "POST",
			data: {email: email, password: password}
		});
	} else {

	}
}

function getSession() {
	var result = $.ajax({
		url: url+"session", 
		async: false,
		method: "GET"
	});
	return result.responseJSON;
}

function destroySession(async) {
	var result = $.ajax({
		url: url+"session", 
		async: async,
		method: "DELETE"
	});
}

function getProblem(problemID) {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
	});
	return result.responseJSON;
}

function getProblemSubmissionsWithSchool(problemID, schoolName) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {problemID: problemID, schoolName: schoolName}
	});
	return result.responseJSON;
}

function getUserSubmissions(userID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {userID: userID}
	});
	return result.responseJSON;
}

function getSubmission(submissionID) {
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "GET",
		data: {submissionID: submissionID}
	});
	return result.responseJSON;
}

function getSchools() {
	var result = $.ajax({
		url: url+"schools", 
		async: false,
		method: "GET"
	});
	return result.responseJSON;
}

function getProblemWithIndex(index) {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {index: index}
	});
	return result.responseJSON;
}

function getProblemsSize() {
	var result = $.ajax({
		url: url+"problem", 
		async: false,
		method: "GET",
		data: {size: 1}
	});
	return result.responseJSON;
}

function getRankOfSubmission(submissionID) {
	var result = $.ajax({
		url: url+"rank", 
		async: false,
		method: "GET",
		data: {submissionID: submissionID}
	});
	return result.responseJSON;
}

function problemIDToIndex(problemID) {
	var result = $.ajax({
		url: url+"toIndex", 
		async: false,
		method: "GET",
		data: {problemID: problemID}
	});
	return result.responseJSON;
}

// FORM MUST HAVE: userID, outputFile
function storeSubmissionDatabase(formID) {
	var formData = new FormData($("#"+formID)[0]);
	var result = $.ajax({
		url: url+"submission", 
		async: false,
		method: "POST",
		data: formData,
		processData: false,
		contentType: false,
		xhr: function() {
			var myXhr = $.ajaxSettings.xhr();
			return myXhr;
		}
	})
	return result.responseJSON;
}

function verifyEmail(userID, verificationCode) {
	var result = $.ajax({
		url: url+"verify", 
		async: false,
		method: "POST",
		data: {userID: userID, code: verificationCode}
	});

	return result.responseJSON;
}

function sendRecoveryEmail(email) {
	var result = $.ajax({
		url: url+"recover", 
		async: false,
		method: "POST",
		data: {email: email}
	});
	console.log(result)
	return result.responseJSON;
}

function recoverEmail(userID, recoveryCode, password) {
	var result = $.ajax({
		url: url+"recover", 
		async: false,
		method: "POST",
		data: {userID: userID, code: recoveryCode, password: password}
	});

	return result.responseJSON;
}
