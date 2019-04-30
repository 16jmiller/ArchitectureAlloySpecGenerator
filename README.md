# ArchitectureAlloySpecGenerator
A web application for changing architectural models into alloy specifications.

# Setup
- To set up this project, be sure to clone the repository.
- Next, from visual studio, click the run solution button.
- **Make sure you are viewing the page in CHROME.**
- Once there, you should see the canvasing page for creating diagrams.

# Examples
## How to Create a Diagram
- To create a diagram, click new diagram in the top left corner.
- This will give you the option to do either Client Server or Pipe and Filter.
- After picking one, a template will appear.
- All of the diagrammed elements will appear the same location on the top left of the canvas. Click and drag them to see the whole template.
- **You can submit just the template with the Generate Alloy button in the top left, and both example templates will work.**
- Using the menu on the right side, you may add Components, Connectors, Roles, Ports, and Attachments.
- **Be sure to follow the correct naming conventions listed below, or the desired Alloy Specification will not appear.**
- **For each naming convention, be sure the casing is correct as well.**
- **Be sure the correct constraints are followed based on the chosen architecture too.**
- If you don't follow these instructions, only a partial Alloy Specification will be generated, which may not work in Alloy until corrections are made.

## For a Client Server example:
- Connectors must have the word 'Connector' in the name.
- The Roles from a Connector must contain the word 'Provider' or 'Requester' in the name.
- Components must have the word 'Client' or 'Server' in the name.
- Ports from the 'Client' Components must have the word 'ServerRequest' in the name.
- Ports from the 'Server' Components must have the word 'ClientAccess' in the name.

## For a Pipe and Filter example:
- Connectors must have the word 'Pipe' in the name.
- The Roles from the 'Pipe' connector must contain the word 'Sink' or 'Source' in the name.
- Components must have the word 'DataSource', 'DataSink', or 'Filter' in the name.
- Ports from the 'DataSource' Components must have the word 'Output' in the name.
- Ports from the 'DataSink' Components must have the word 'Input' in the name.
- Ports from the 'Filter' Components must have the word 'Input' or 'Output' in the name.

## Generating an Alloy Spec:
- Once finished with designing a model, click on the generate alloy button in the top left.
- This will create a file that went to your downloads folder called: 'alloy-specification.als'
- **Move this file into the directory with your library folder that contains the Pnf_simplified.als and Cns_simplified.als files since the generated spec relies on them.**
- Open the file in alloy to test it.
