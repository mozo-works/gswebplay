INSERT INTO draggableviews_structure 
SELECT
	NULL
	,view_name
	,'block_1' AS view_display
	,args
	,entity_id
	,weight
	,parent
FROM
	draggableviews_structure
WHERE
	view_display IN ('page_2', 'attachment_2');
