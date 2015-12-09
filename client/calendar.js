var itemId;
Template.calendar.helpers({
	days : ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],
	items: function() {
		monday=Session.get("monday")||moment().subtract(moment().day()-1,'d');
		return _.map(_.range(7),function(e){
						date_X=moment(monday).add(e,'d').format("DD.MM.YY");
							return  {date :date_X, items: agenda.find({date: date_X}).fetch()};
							});
	}
});

Template.calendar.events({
	'click img' : function(e){
		console.log($(e.target).parent());
		agenda.remove($(e.currentTarget).parent()[0].id);
	}
});
Template.calendar.rendered=function(){

}


Template.tasks.helpers({
	tasks: function(){
		return tasks.find().fetch();
	}
});

Template.tasks.rendered=function(){

}
Template.tasks.events({
	'keyup #say ': function(e){
		if (e.which==13){
			tasks.insert({text: say.value, duration: 8, fraction: 2});
			say.value="";	
		}
	},
	'click img' : function(e){
		tasks.remove($(e.currentTarget).parent()[0].id);
				$(".agenda_item").draggable();
		$("#calendar td").droppable({
		drop: function(e){
			el=$(".ui-draggable-dragging");
			console.log(Session.get("task_id"));
			tasks.update(Session.get("task_id"),{$set : {planned : true}});
			agenda.insert({
			name:	el.text(),
			date:	$(e.target).attr('date')})
			}
		});
		$(".task").draggable({
		helper : "clone",
		start: function(event,ui){
        	    Session.set("task_id", $(this).attr('id'));
	        }
	});

	}
});